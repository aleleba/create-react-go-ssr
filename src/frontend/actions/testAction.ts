export enum ActionTypesTest {
    ChangeHello = 'CHANGE_HELLO'
}

export interface IChangeHello {
    type: ActionTypesTest.ChangeHello
    payload: IChangeHelloPayload
}

export interface IChangeHelloPayload {
	hello: any | undefined
}

export type TTest = IChangeHello

const changeHello = (payload: string) => ({
    type: ActionTypesTest.ChangeHello,
    payload
})

const actions = {
    changeHello
}

export default actions