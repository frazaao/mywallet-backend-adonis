import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public type: string

  @column({ serializeAs:null })
  public userId: number

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => {
    return value.toFormat('dd/MM/yy')
  }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => {
    return value.toFormat('dd/MM/yy')
  }})
  public updatedAt: DateTime
}
