const Readline = require('readline');

const lineReader = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isNumber = val => typeof val === 'number' && isFinite(val);

const celsiusToKelvin = val => val + 273.15;

const getEquationValues = values => {
  try {
    const tpv = values.replace(' ', '').split(',').map(Number);
    const valuesAreValid = tpv.every(isNumber) && tpv.length === 3;

    if (!valuesAreValid) throw new Error();

    const [t, p, v] = tpv;

    return { t: celsiusToKelvin(t), p, v };
  } catch {
    throw new Error('Invalid input, try again');
  }
};

const calculateN = ({ t, p, v }) => {
  const r = 8.314;
  return (p * v) / (r * t);
};

const init = () => {
  lineReader.question(
    'Insira os valores de t(°C), p(pascal), v(m³), respectivamente e separados por vírgula:\n',
    input => {
      const equationValues = getEquationValues(input);
      const n = calculateN(equationValues);

      console.table({ ...equationValues, n });

      lineReader.close();
    }
  );
};

init();
