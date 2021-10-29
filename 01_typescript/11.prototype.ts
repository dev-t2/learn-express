function func() {}

console.log(func.prototype);

func.prototype.name = 'dog';

console.log(func.prototype);
