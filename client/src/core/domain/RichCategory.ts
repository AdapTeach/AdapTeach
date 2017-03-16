import {UUID} from './UUID'

export interface RichCategory {
   uuid: UUID,
   name: string,
   parent?: RichCategory
}
