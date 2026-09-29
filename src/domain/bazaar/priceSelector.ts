import type { BazaarPrice } from "./bazaarPrice";
import type { InputOrderType, OutputOrderType } from "./orderType";

export function getInputPrice(
    price: BazaarPrice,
    orderType: InputOrderType
): number {
    switch (orderType) {
        case "buyOrder":
            return price.buyPrice
        case "instaBuy":
            return price.sellPrice
    }
}

export function getOutputPrice(
    price: BazaarPrice,
    orderType: OutputOrderType
): number {
    switch(orderType) {
        case "instaSell":
            return price.buyPrice
        case "sellOrder":
            return price.sellPrice
    }
}