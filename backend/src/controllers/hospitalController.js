import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Register a new hospital
export const registerHospital = async (req, res) => {
  try {
    const { name, location, contactPerson, email, password } = req.body;

    if (!name || !location || !contactPerson || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existing = await prisma.hospital.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Hospital with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const hospital = await prisma.hospital.create({
      data: {
        name,
        location,
        contactPerson,
        email,
        passwordHash,
      },
    });

    res.status(201).json({ message: 'Hospital registered successfully.', hospital });
  } catch (error) {
    console.error('Error registering hospital:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        contactPerson: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(hospitals);
  } catch (err) {
    console.error('Error fetching hospitals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
