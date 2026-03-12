import { EventBusService } from "@medusajs/medusa"

type InjectedDependencies = {
  eventBusService: EventBusService
}

class InventoryUpdateSubscriber {
  protected eventBus_: EventBusService

  constructor({ eventBusService }: InjectedDependencies) {
    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("product.updated", this.handleProductUpdate)
    this.eventBus_.subscribe("product-variant.updated", this.handleVariantUpdate)
  }

  handleProductUpdate = async (data: any) => {
    // Trigger webhook to sync with CMS
    if (process.env.SYNC_SERVICE_URL) {
      try {
        await fetch(`${process.env.SYNC_SERVICE_URL}/sync/medusa-to-cms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Medusa-Secret': process.env.MEDUSA_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify({
            event: 'product.updated',
            data,
          }),
        })
      } catch (error) {
        console.error('Failed to trigger sync webhook:', error)
      }
    }
  }

  handleVariantUpdate = async (data: any) => {
    // Trigger webhook to sync with CMS
    if (process.env.SYNC_SERVICE_URL) {
      try {
        await fetch(`${process.env.SYNC_SERVICE_URL}/sync/medusa-to-cms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Medusa-Secret': process.env.MEDUSA_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify({
            event: 'product-variant.updated',
            data,
          }),
        })
      } catch (error) {
        console.error('Failed to trigger sync webhook:', error)
      }
    }
  }
}

export default InventoryUpdateSubscriber
