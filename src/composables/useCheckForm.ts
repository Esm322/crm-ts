import type { IErrors } from '@/models/ObjectModels'
import type { ICallVoid } from '@/models/CallFuncModels'

export default function useCheckForm(
  firstName: string,
  secondName: string,
  errors: IErrors,
  action: ICallVoid
): void {
  if (firstName && secondName) {
    action()
  }

  if (!firstName) {
    errors.error.errorFirstName = 'Требуется указать имя'
  }

  if (!secondName) {
    errors.error.errorSecondName = 'Требуется указать фамилию'
  }
}
