class ManualPaymentService extends require('@medusajs/medusa').AbstractPaymentService {
  static identifier = 'manual'

  async getStatus(paymentData) {
    return 'authorized'
  }

  async retrievePayment(paymentData) {
    return paymentData
  }

  async createPayment(cart) {
    return {
      session_data: {
        id: `manual_${Date.now()}`,
        cart_id: cart.id,
        amount: cart.total,
        status: 'authorized',
      },
      update_requests: {
        customer_metadata: {},
      },
    }
  }

  async updatePayment(sessionId, cart) {
    return {
      session_data: {
        id: sessionId,
        cart_id: cart.id,
        amount: cart.total,
        status: 'authorized',
      },
      update_requests: {
        customer_metadata: {},
      },
    }
  }

  async authorizePayment(sessionData, context = {}) {
    return {
      status: 'authorized',
      data: {
        id: sessionData.id,
        status: 'authorized',
      },
    }
  }

  async capturePayment(paymentData) {
    return {
      id: paymentData.id,
      status: 'captured',
    }
  }

  async refundPayment(paymentData, refundAmount) {
    return {
      id: paymentData.id,
      status: 'refunded',
    }
  }

  async cancelPayment(paymentData) {
    return {
      id: paymentData.id,
      status: 'canceled',
    }
  }

  async deletePayment(paymentData) {
    return {}
  }
}

module.exports = ManualPaymentService
