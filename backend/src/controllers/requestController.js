import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createRequest = async (req, res) => {
  try {
    const { fromHospitalId, toHospitalId, resourceType, quantity, message } = req.body;

    if (!fromHospitalId || !toHospitalId || !resourceType || !quantity) {
      return res.status(400).json({ error: 'Required fields missing.' });
    }

    const request = await prisma.request.create({
      data: {
        fromHospitalId,
        toHospitalId,
        resourceType,
        quantity,
        message
      }
    });

    res.status(201).json({ message: 'Resource request created.', request });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllRequests = async (req, res) => {
    try {
      const requests = await prisma.request.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          fromHospital: {
            select: { id: true, name: true, location: true }
          },
          toHospital: {
            select: { id: true, name: true, location: true }
          }
        }
      });
  
      res.status(200).json(requests);
    } catch (err) {
      console.error('Error fetching requests:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const updateRequestStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['approved', 'declined'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
      }
  
      const existing = await prisma.request.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: 'Request not found.' });
      }
  
      const updated = await prisma.request.update({
        where: { id },
        data: { status }
      });
  
      res.status(200).json({ message: 'Request status updated.', request: updated });
    } catch (err) {
      console.error('Error updating request:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  