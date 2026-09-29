import { describe, expect, it } from "vitest";
import type { BazaarPrice } from "./bazaarPrice";
import { getInputPrice, getOutputPrice } from "./priceSelector";

const price: BazaarPrice = {
    itemId: "TEST_ITEM",
    buyPrice: 100,
    sellPrice: 150,
    updatedAt: Date.now()
}

describe("getInputPrice", () => {
    it("Buy Orderの場合、buyPriceを返す", () => {
        expect(getInputPrice(price, "buyOrder")).toBe(100);
    })
    it("Insta Buyの場合、sellPriceを返す", () => {
        expect(getInputPrice(price, "instaBuy")).toBe(150);
    })
    it("Sell Orderの場合、sellPriceを返す", () => {
        expect(getOutputPrice(price, "sellOrder")).toBe(150);
    })
    it("Insta Sellの場合、buyPriceを返す", () => {
        expect(getOutputPrice(price, "instaSell")).toBe(100);
    })
})