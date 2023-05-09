import { handleFetch } from "./handleFetch";

const API = import.meta.env.VITE_URL_API;

const OPERATIONS = {
  sum: {
    name: "sum",
    symbol: "+",
    operation: async ({ op1, op2 }) => {
      const url = `${API}/sumar?op1=${op1}&op2=${op2}`;
      return await handleFetch({ url });
    },
  },
  sub: {
    name: "sub",
    symbol: "-",
    operation: async ({ op1, op2 }) => {
      const url = `${API}/restar?op1=${op1}&op2=${op2}`;
      return await handleFetch({ url });
    },
  },
  mul: {
    name: "mul",
    symbol: "X",
    operation: async ({ op1, op2 }) => {
      const url = `${API}/multiplicar?op1=${op1}&op2=${op2}`;
      return await handleFetch({ url });
    },
  },
  div: {
    name: "div",
    symbol: "/",
    operation: async ({ op1, op2 }) => {
      const url = `${API}/dividir?op1=${op1}&op2=${op2}`;
      return await handleFetch({ url });
    },
  },
};

export const doOperation = async ({ op1, op2, typeOfOperation }) => {
  if (typeOfOperation === OPERATIONS.sum.symbol) return await OPERATIONS.sum.operation({ op1, op2 });
  if (typeOfOperation === OPERATIONS.sub.symbol) return await OPERATIONS.sub.operation({ op1, op2 });
  if (typeOfOperation === OPERATIONS.mul.symbol) return await OPERATIONS.mul.operation({ op1, op2 });
  if (typeOfOperation === OPERATIONS.div.symbol) return await OPERATIONS.div.operation({ op1, op2 });
  return new Error("Invalid operation");
};
