import type { INumber, IBooelean } from '@/models/PrimitiveModels'

export default function useSortFullName(
  dirId: INumber,
  isDirId: IBooelean,
  dirFullName: INumber,
  isDirFullName: IBooelean,
  dirCreate: INumber,
  isDirCreate: IBooelean,
  dirEdit: INumber,
  isDirEdit: IBooelean
) {
  dirId.value = 0
  isDirId.value = false

  dirCreate.value = 0
  isDirCreate.value = false

  dirEdit.value = 0
  isDirEdit.value = false

  if (isDirFullName.value === false && dirFullName.value === 0) {
    isDirFullName.value = true
    dirFullName.value = 1
  } else if (isDirFullName.value === true && dirFullName.value === 1) {
    dirFullName.value = 2
  } else {
    dirFullName.value = 1
  }
}
