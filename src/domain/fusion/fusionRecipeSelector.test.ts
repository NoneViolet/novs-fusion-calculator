import { describe, expect, it } from "vitest";
import { getRecipesForOutput } from "./fusionRecipeSelector";

const recipes = [
    {
        id: "recipe-a",
        inputs: [
            {
                shard: "MATERIAL_A",
                amount: 5
            },
            {
                shard: "MATERIAL_B",
                amount: 5
            }
        ],
        output: {
            shard: "C",
            amount: 2,
        },
    },
    {
        id: "recipe-b",
        inputs: [
            {
                shard: "MATERIAL_X",
                amount: 10
            },
            {
                shard: "MATERIAL_Y",
                amount: 10
            }
        ],
        output: {
            shard: "C",
            amount: 1,
        },
    },
    {
        id: "recipe-c",
        inputs: [
            {
                shard: "MATERIAL_B",
                amount: 15
            },
            {
                shard: "MATERIAL_C",
                amount: 15
            }
        ],
        output: {
            shard: "D",
            amount: 3,
        },
    },
];

describe("getRecipesForOutput", () => {
    it("指定したOutputを持つRecipeを取得できる", () => {

        const result = getRecipesForOutput(recipes, "C");

        expect(result).toHaveLength(2);
        expect(result.map((recipe) => recipe.id)).toEqual([
            "recipe-a",
            "recipe-b",
        ]);
    });

    it("指定したOutputを持つRecipeが存在しない場合、空配列を返す", () => {
        const result = getRecipesForOutput(recipes, "UNKNOWN");

        expect(result).toEqual([]);
    });
});