const createUser =  async (req,res)=>{

    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, password: hashedPassword });
  
      await user.save();
      res.redirect("/jobs/jobs");             
    } catch (error) {
        res.status(500).json({message: error.message})
    }

  };

module.exports = { createUser };