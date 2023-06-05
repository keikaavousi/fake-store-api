module.exports = {
  indexPage: (req, res) => {
    res.render("home/index");
  },

  docsPage: (req, res) => {
    res.render("home/docs");
  },
};
