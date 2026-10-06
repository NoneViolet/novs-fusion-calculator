import { describe, expect, it } from "vitest";
import type { BazaarPrice } from "../bazaar/bazaarPrice";
import type { FusionRecipe } from "./fusionRecipe";
import { calculateShardCost } from './fusionCalculator';

//テスト用レシピ
const recipe: FusionRecipe = {
    inputShards: ["MATERIAL_A", "MATERIAL_B"],
    outputShard: "OUTPUT",
    outputAmount: 2
};

//テスト用価格セット
const prices = new Map<string, BazaarPrice>([
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
    ]
]);


//テストケース
describe("calculateShardCost", () => {
    describe("正常系", () => {
        it("Buy Orderで材料を購入した場合のOutput 1個当たりのコストを計算する", () => {
            const result = calculateShardCost(recipe, prices, "buyOrder");
            expect(result).toBe(150);
        });

        it("Insta Buyで材料を購入した場合のOutput 1個当たりのコストを計算する", () => {
            const result = calculateShardCost(recipe, prices, "instaBuy");
            expect(result).toBe(200);
        });
    })

    describe("異常系", () => {
        it("必要な価格情報が存在しない場合、エラーになる", () => {
            const notFoundPrices = new Map<string, BazaarPrice>([
                [
                    "MATERIAL_A",
                    {
                        itemId: "MATERIAL_A",
                        buyPrice: 100,
                        sellPrice: 90,
                        updatedAt: Date.now(),
                    }
                ]
            ]);

            expect(() => {
                calculateShardCost(recipe, notFoundPrices, "buyOrder");
            }).toThrow("Price not found: MATERIAL_B");
        });
    });
})