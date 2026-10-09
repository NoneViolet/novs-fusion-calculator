import { describe, expect, it } from "vitest";
import { mapFusionRecipes } from "./fusionDataMapper";
import type { RawFusionData } from "./fusionData";

describe("mapFusionRecipes", () => {
    it("RawFusionDataをFusionRecipe[]に変換できる", () => {
        const data: RawFusionData = {
            recipes: {
                C1: {
                    "2": [
                        ["C4", "U1"],
                        ["C4", "U2"],
                    ],
                },
            },
            shards: {},
        };

        const result = mapFusionRecipes(data);

        expect(result).toEqual([
            {
                inputShards: ["C4", "U1"],
                outputShard: "C1",
                outputAmount: 2,
            },
            {
                inputShards: ["C4", "U2"],
                outputShard: "C1",
                outputAmount: 2,
            },
        ]);
    });
    it("複数の出力個数を持つレシピを変換できる", () => {
        const data: RawFusionData = {
            recipes: {
                C1: {
                    "2": [
                        ["C4", "U1"],
                    ],
                    "3": [
                        ["C5", "U2"],
                    ],
                },
            },
            shards: {},
        };

        const result = mapFusionRecipes(data);

        expect(result).toEqual([
            {
                inputShards: ["C4", "U1"],
                outputShard: "C1",
                outputAmount: 2,
            },
            {
                inputShards: ["C5", "U2"],
                outputShard: "C1",
                outputAmount: 3,
            },
        ]);
    });
});