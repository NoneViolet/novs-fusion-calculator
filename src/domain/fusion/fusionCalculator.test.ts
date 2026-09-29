import { describe, expect, it } from "vitest";
import type { BazaarPrice } from "../bazaar/bazaarPrice";
import type { FusionRecipe } from "./fusionRecipe";
import { calculateFusionProfit } from './fusionCalculator';

//テスト用レシピ
const recipe: FusionRecipe = {
    id: "test-recipe",
    inputs: [
        {
            itemId: "MATERIAL_A",
            amount: 5
        },
        {
            itemId: "MATERIAL_B",
            amount: 5
        }
    ],
    output: {
        itemId: "OUTPUT",
        amount: 2
    }
};


//テスト用価格セット
const profitPrices = new Map<string, BazaarPrice>([
    [
        "MATERIAL_A",
        {
            itemId: "MATERIAL_A",
            buyPrice: 100,
            sellPrice: 150,
            updatedAt: Date.now(),
        }
    ],
    [
        "MATERIAL_B",
        {
            itemId: "MATERIAL_B",
            buyPrice: 200,
            sellPrice: 250,
            updatedAt: Date.now(),
        }
    ],
    [
        "OUTPUT",
        {
            itemId: "OUTPUT",
            buyPrice: 900,
            sellPrice: 1_000,
            updatedAt: Date.now(),
        }
    ],
]);


//テストケース
describe("calculateFusionProfit", () => {
    describe("正常系", () => {
        it("Buy Orderで材料を購入し、Sell Orderで完成品を売却した場合の利益を計算できる", () => {
            const result = calculateFusionProfit(recipe, profitPrices, {
                inputOrderType: "buyOrder",
                outputOrderType: "sellOrder",
            });

            expect(result.cost).toBe(1_500);
            expect(result.revenue).toBe(2_000);
            expect(result.profit).toBe(500);
            expect(result.roi).toBeCloseTo(1 / 3);
        });


            it("Buy Orderで材料を購入し、Insta Sellで完成品を売却した場合の利益を計算できる", () => {
            const result = calculateFusionProfit(recipe, profitPrices, {
                inputOrderType: "buyOrder",
                outputOrderType: "instaSell",
            });

            expect(result.cost).toBe(1_500);
            expect(result.revenue).toBe(1_800);
            expect(result.profit).toBe(300);
            expect(result.roi).toBeCloseTo(0.2);
        });

            it("Insta Buyで材料を購入し、Sell Orderで完成品を売却した場合の利益を計算できる", () => {
            const result = calculateFusionProfit(recipe, profitPrices, {
                inputOrderType: "instaBuy",
                outputOrderType: "sellOrder",
            });

            expect(result.cost).toBe(2_000);
            expect(result.revenue).toBe(2_000);
            expect(result.profit).toBe(0);
            expect(result.roi).toBeCloseTo(0);
        });


            it("Insta Buyで材料を購入し、Insta Sellで完成品を売却した場合の利益を計算できる", () => {
            const result = calculateFusionProfit(recipe, profitPrices, {
                inputOrderType: "instaBuy",
                outputOrderType: "instaSell",
            });

            expect(result.cost).toBe(2_000);
            expect(result.revenue).toBe(1_800);
            expect(result.profit).toBe(-200);
            expect(result.roi).toBeCloseTo(-0.1);
        });
    })

    describe("準正常系", () => {
        it("Fusion後の売却額が材料費を下回る場合、赤字になる", () => {
            const recipe: FusionRecipe = {
                id: "loss-recipe",
                inputs: [
                    {
                        itemId: "MATERIAL_A",
                        amount: 5
                    },
                    {
                        itemId: "MATERIAL_B",
                        amount: 5
                    }
                ],
                output: {
                    itemId: "OUTPUT",
                    amount: 1
                    }
            };

        const prices = new Map<string, BazaarPrice>([
            [
                "MATERIAL_A",
                {
                    itemId: "MATERIAL_A",
                    buyPrice: 100,
                    sellPrice: 90,
                    updatedAt: Date.now(),
                }
            ],
            [
                "MATERIAL_B",
                {
                    itemId: "MATERIAL_B",
                    buyPrice: 200,
                    sellPrice: 180,
                    updatedAt: Date.now(),
                }
            ],
            [
                "OUTPUT",
                {
                    itemId: "OUTPUT",
                    buyPrice: 500,
                    sellPrice: 500,
                    updatedAt: Date.now(),
                }
            ],
        ]);

        const result = calculateFusionProfit(recipe, prices, {
            inputOrderType: "buyOrder",
            outputOrderType: "sellOrder",
        });
        
        expect(result.cost).toBe(1_500);
        expect(result.revenue).toBe(500);
        expect(result.profit).toBe(-1_000);
        });
    });


    describe("異常系", () => {
        it("必要な価格情報が存在しない場合、エラーになる", () => {
            const recipe: FusionRecipe = {
                id: "missing-price-recipe",
                inputs: [
                    {
                        itemId: "MATERIAL_A",
                        amount: 5
                    },
                    {
                        itemId: "MATERIAL_B",
                        amount: 5
                    }
                ],
                output: {
                    itemId: "OUTPUT",
                    amount: 1
                    }
            };

            const prices = new Map<string, BazaarPrice>([
                [
                    "MATERIAL_A",
                    {
                        itemId: "MATERIAL_A",
                        buyPrice: 100,
                        sellPrice: 90,
                        updatedAt: Date.now(),
                    }
                ],
                [
                    "OUTPUT",
                    {
                        itemId: "OUTPUT",
                        buyPrice: 500,
                        sellPrice: 500,
                        updatedAt: Date.now(),
                    }
                ],
            ]);

            expect(() => {
                calculateFusionProfit(recipe, prices, {
                    inputOrderType: "buyOrder",
                    outputOrderType: "sellOrder",
                });
            }).toThrow("Price not found: MATERIAL_B");
        });
    });
})