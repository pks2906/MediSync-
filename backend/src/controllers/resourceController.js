import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addResource = async (req, res) => {
  try {
    const { hospitalId, type, available, inUse } = req.body;

    if (!hospitalId || !type || available === undefined || inUse === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const hospital = await prisma.hospital.findUnique({ where: { id: hospitalId } });
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found.' });
    }

    const existing = await prisma.resource.findFirst({
      where: { hospitalId, type }
    });

    let resource;
    if (existing) {
      resource = await prisma.resource.update({
        where: { id: existing.id },
        data: { available, inUse }
      });
    } else {
      resource = await prisma.resource.create({
        data: {
          hospitalId,
          type,
          available,
          inUse
        }
      });
    }

    res.status(200).json({ message: 'Resource added/updated successfully.', resource });
  } catch (err) {
    console.error('Error adding resource:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllResources = async (req, res) => {
    try {
      const resources = await prisma.resource.findMany({
        include: {
          hospital: {
            select: { name: true, location: true }
          }
        },
        orderBy: {
          lastUpdated: 'desc'
        }
      });
  
      res.status(200).json(resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
