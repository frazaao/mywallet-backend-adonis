import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

export default class TransactionsController {
  public async index({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    await user.load('transactions', (transactionsQuery) => {
      transactionsQuery
    })

    return user.transactions;
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const { title, description, amount, type } = request.all()

    const transaction = await Transaction.create({ title, description, amount, type, userId: user.id })

    return transaction
  }

  public async show({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const id = params.id

    await user.load('transactions',
    (transactionsQuery) =>  transactionsQuery.where('id', '=', id)
    )

    const [ transaction ] = user.transactions;

    return transaction
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const id = params.id
    const { title, description, amount, type } = request.all()
    const newTransaction = { title, description, amount, type }

    await user.load('transactions',
    (transactionsQuery) =>  transactionsQuery.where('id', '=', id)
    )

    const [transaction] = user.transactions

    transaction.merge(newTransaction)

    return transaction
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const id = params.id

    await user.load('transactions',
    (transactionsQuery) =>  transactionsQuery.where('id', '=', id)
    )

    const [transaction] = user.transactions

    transaction.delete()
  }
}
