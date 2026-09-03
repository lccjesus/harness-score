export function calculateMeetingCost(participants, durationMinutes, hourlyCost) {
  if (!Number.isFinite(participants)) {
    throw new TypeError('O número de participantes deve ser finito.');
  }
  if (!Number.isInteger(participants) || participants < 1) {
    throw new RangeError('Informe pelo menos 1 participante (número inteiro).');
  }
  if (!Number.isFinite(durationMinutes)) {
    throw new TypeError('A duração deve ser um número finito de minutos.');
  }
  if (durationMinutes <= 0) {
    throw new RangeError('A duração deve ser maior que zero.');
  }
  if (!Number.isFinite(hourlyCost)) {
    throw new TypeError('O custo por hora deve ser um número finito.');
  }
  if (hourlyCost < 0) {
    throw new RangeError('O custo por hora não pode ser negativo.');
  }

  return participants * (durationMinutes / 60) * hourlyCost;
}
