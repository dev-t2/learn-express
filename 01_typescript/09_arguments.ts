// function func() {
//   console.log(arguments);
// }

// func(1, 2, 3, 4);

const func = (...args: number[]) => {
  console.log(args);
};

func(1, 2, 3, 4);
