exports.handleSignup = async (req, res) => {
  const { name, zid, password, degree, year } = req.body;
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!zid) missingFields.push("zid");
  if (!password) missingFields.push("password");
  if (!degree) missingFields.push("degree");
  if (!year) missingFields.push("year");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({
        success: false,
        error: `Missing required field(s): ${missingFields.join(", ")}`,
      });
  }

  if (
    typeof name !== "string" ||
    typeof zid !== "string" ||
    typeof password !== "string" ||
    typeof degree !== "string" ||
    typeof year !== "number"
  ) {
    return res
      .status(400)
      .json({
        success: false,
        error:
          "Invalid data types provided. Expected types: name, zid, password, degree as string and year as number.",
      });
  }

  try {
    // Postgresql query to check if the zID already exists in the db
    // If the user exists return an error

    const hashedPassword = await bcrypt.hash(password, 10);

    // Add all the data to the database and do all that stuff

    // if signup is sucessful 
        return res.status(201).json({ success: true, message: 'Signup was successful'})
    //

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal server error signing up: ", err });
  }
};


exports.handleLogin = async (req, res) => {
    const { zid, password } = req.body;
    const missingFields = [];
    if (!zid) missingFields.push("zid");
    if (!password) missingFields.push("password");
    
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: `Missing required field(s): ${missingFields.join(", ")}` });
    }
    
    if (typeof zid !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Invalid data types provided. Expected zid and password to be strings." });
    }
    
    try {
        // Fetch the users hashed password from the database
        const correctPassword = await bcrypt.compare(reqPassword, dbPassword)

        if (!correctPassword) {
            return res.status(401).json({success: false, message: 'Incorrect password'})
        }

        if (correctPassword) {
            return res.status(200).json({ success: true, data: {/**Basic data like zid and name fetched, i want to get this so i can add it to local storage*/} })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error logging in: ", err });
    }  
};
