import { calculateMeetingCost } from './meeting-cost.js';

const usage = 'Uso: npm start -- <participantes> <minutos> <custo-por-hora>';
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error(`Erro: informe exatamente três valores.\n${usage}`);
  process.exitCode = 1;
} else {
  try {
    const [participants, durationMinutes, hourlyCost] = args.map(Number);
    const total = calculateMeetingCost(participants, durationMinutes, hourlyCost);
    console.log(`Custo total da reunião: ${total.toFixed(2)}`);
  } catch (error) {
    console.error(`Erro: ${error.message}\n${usage}`);
    process.exitCode = 1;
  }
}
