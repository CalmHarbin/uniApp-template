import { rootStateType } from './index'
import { systemStateType } from './modules/system'

export interface StateType extends rootStateType {
    system: systemStateType
}
