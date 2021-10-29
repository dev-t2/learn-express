const animal = {
  name: 'dog',
  say: function () {
    console.log(this);
  },
};

animal.say();

const sayAnimal1 = animal.say;

sayAnimal1();

const sayAnimal2 = animal.say.bind(animal);

sayAnimal2();
