import { describe, expect, it } from "vitest";
import { getRecipesForOutput } from "./fusionRecipeSelector";

const recipes = [
    {
        inputShards: ["MATERIAL_A", "MATERIAL_B"],
        outputShard: "C",
        outputAmount: 2,
    },
    {
        inputShards: ["MATERIAL_X", "MATERIAL_Y"],
        outputShard: "C",
        outputAmount: 1,
    },
    {
        inputShards: ["MATERIAL_B", "MATERIAL_C"],
        outputShard: "D",
        outputAmount: 3,
    },
];

describe("getRecipesForOutput", () => {
    it("指定したOutputを持つRecipeを取得できる", () => {
        const result = getRecipesForOutput(recipes, "C");

        expect(result).toHaveLength(2);

        expect(result).toEqual([
            {
                inputShards: ["MATERIAL_A", "MATERIAL_B"],
                outputShard: "C",
                outputAmount: 2,
            },
            {
                inputShards: ["MATERIAL_X", "MATERIAL_Y"],
                outputShard: "C",
                outputAmount: 1,
            },
        ]);
    });

    it("指定したOutputを持つRecipeが存在しない場合、空配列を返す", () => {
        const result = getRecipesForOutput(recipes, "UNKNOWN");

        expect(result).toEqual([]);
    });
});