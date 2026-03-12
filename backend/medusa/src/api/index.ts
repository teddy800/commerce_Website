import { registerOverriddenValidators } from "@medusajs/medusa"
import { StorePostCartsCartReq as MedusaStorePostCartsCartReq } from "@medusajs/medusa/dist/api/routes/store/carts"

// Custom validators can be added here
registerOverriddenValidators(StorePostCartsCartReq, MedusaStorePostCartsCartReq)

export * from "./routes"
