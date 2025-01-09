/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid'
import { WidgetSchema } from '@/lib/definition'

/**
 * 为 Widget Schema 的定义提供类型推断
 * @param options - Widget Schema 除 id 以外的字段，id 会在该函数中自动生成，避免到处 import uuid
 * @returns 返回一个 Widget Schema
 */
export function defineWidgetSchema<State = any>(options: WidgetSchema<State>) {
  return options
}

/**
 * 使用 Schema 创建一个 Widget
 * @param schema - Widget Schema
 * @param state - Widget 的状态，当从已有 Widget 复制时，传入并使用该状态，否则将使用 schema 中定义的 defaultState
 * @returns 返回一个 Widget
 */
export function createWidget<S = any>(schema: WidgetSchema<S>, state?: S) {
  return {
    id: uuidv4(),
    kind: schema.kind,
    state: state ?? schema.defaultState
  }
}
