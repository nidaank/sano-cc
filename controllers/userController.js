const prisma = require("../config/databaseConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
	try {
		const user = await prisma.users.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			}
		});
		res.json(user);
	} catch (error) {
		console.log(error);
	}  
}

const register = async (req, res) => {
	const { name, email, password, confPassword } = req.body;
	if (password !== confPassword) return res.status(400).json({ msg: "Sesuaikan Password" });
	const hashPassword = await bcrypt.hash(password, 10);
	try {
		await prisma.users.create({
			data: {
				name,
				email,
				password: hashPassword,
			}
		});
		res.json({ msg: "Register berhasil" });
	} catch (error) {
		console.log(error);
	}
}

const login = async (req, res) => {
	try {

		const user = await prisma.users.findMany({
			where: {
				email: req.body.email,
			}
		});
	
		if (user.length === 0) {
			return res.status(404).json({ msg: "email atau password salah "});
		}
	
		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (!match) return res.status(400).json({ msg: "email dan password tidak ditemukan" });
	
		const userId = user[0].id;
		const name = user[0].name;
		const email = user[0].email;
	
		const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1d'
		});
	
		const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '7d'
		});
	
		await prisma.users.update({
			data: {
				refresh_token: refreshToken,
			},
			where: {
				id: userId,
			}
		});
	
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			secure: true
		});
		res.json({ accessToken });
	} catch (error) {
		console.log(error);
    res.status(404).json({ msg: "email dan password tidak ditemukan" });
	}
}
  
module.exports = {
	login,
	register,
	getUsers
};  