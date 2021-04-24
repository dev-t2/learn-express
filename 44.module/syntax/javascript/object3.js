const o = {
  v1: 'v1',
  v2: 'v2',
  f1() {
    console.log(this, this.v1);
  },
  f2: () => console.log(this, o.v2),
};

o.f1();
o.f2();
