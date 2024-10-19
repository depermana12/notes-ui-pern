const expiresIn = {
  day: 1,
  milliesecond() {
    return this.day * 24 * 60 * 60 * 1000;
  },
  date() {
    return new Date(Date.now() + this.milliesecond());
  },
};

export default expiresIn;
