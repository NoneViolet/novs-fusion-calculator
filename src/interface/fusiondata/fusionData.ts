export type RawShard = {
    name: string;
    family: string;
    type: string;
    rarity: string;
    fuse_amount: number;
    synthesized: boolean;
    chameleon: boolean;
    recipe_type: string | null;
    internal_id: string;
};

export type RawFusionData = {
    recipes: {
        [outputShardId: string]: {
            [outputAmount: string]: string[][];
        };
    };

    shards: {
        [shardId: string]: RawShard;
    };
};