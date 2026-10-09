import { describe, expect, it } from "vitest";
import type { BazaarPrice } from "../bazaar/bazaarPrice";
import type { FusionRecipe } from "./fusionRecipe";
import { calculateShardCost } from './fusionCalculator';
import type { Shard } from "../shard/shard";

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

const shards = new Map<string, Shard>([
    [
        "MATERIAL_A",
        {
            id: "MATERIAL_A",
            name: "Material A",
            hypixelId: "MATERIAL_A",
            rarity: "common",
            fuseAmount: 5,
        },
    ],
    [
        "MATERIAL_B",
        {
            id: "MATERIAL_B",
            name: "Material B",
            hypixelId: "MATERIAL_B",
            rarity: "common",
            fuseAmount: 5,
        },
    ],
]);

//テストケース
describe("calculateShardCost", () => {
    describe("正常系", () => {
        it("Buy Orderで材料を購入した場合のOutput 1個当たりのコストを計算する", () => {
            const result = calculateShardCost(recipe, shards, prices, "buyOrder");
            expect(result).toBe(750);
        });

        it("Insta Buyで材料を購入した場合のOutput 1個当たりのコストを計算する", () => {
            const result = calculateShardCost(recipe, shards, prices, "instaBuy");
            expect(result).toBe(1_000);
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
                calculateShardCost(recipe, shards, notFoundPrices, "buyOrder");
            }).toThrow("Price not found: MATERIAL_B");
        });
        it("必要なShard情報が存在しない場合、エラーになる", () => {
            const notFoundShards = new Map<string, Shard>();

            expect(() => {
                calculateShardCost(
                    recipe,
                    notFoundShards,
                    prices,
                    "buyOrder",
                );
            }).toThrow("Shard not found: MATERIAL_A");
        });
    });
})