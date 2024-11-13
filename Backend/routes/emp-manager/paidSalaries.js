const router = require("express").Router();
const Paidsalaries = require("../../models/emp-manager/paidSalaries")

//add new paidsalarie for the system
router.post("/", async (req, res) => {
  const paymentid = req.body.paymentid;
  const emplid = req.body.emplid;
  const email = req.body.email;
  const accountnumber = req.body.accountnumber;
  const basicsalary = req.body.basicsalary;
  const totalsalary = req.body.totalsalary;
  const paiddate = Date(req.body.paiddate);

  const newPaidsalaries = new Paidsalaries({
    paymentid,
    emplid,
    email,
    accountnumber,
    basicsalary,
    totalsalary,
    paiddate,
  });

  newPaidsalaries
    .save()
    .then(() => {
      res.json("New paid salary Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Paidsalaries.find()
    .then((paidsalaries) => {
      res.json(paidsalaries);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
