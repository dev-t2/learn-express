interface ICoffee {
  name: string;
}

const coffee: ICoffee[] = [];

coffee.push({ name: 'americano' });
coffee.push({ name: 'latte' });

console.log(coffee);
console.log(coffee[0]);
console.log(coffee.length);
