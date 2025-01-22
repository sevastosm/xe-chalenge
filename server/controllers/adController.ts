import { Request, Response } from 'express';
import Ad from '../models/Ad';

export const createAd = async (req: Request, res: Response) => {
  try {
    const ad = new Ad(req.body);
    const savedAd = await ad.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ad' });
  }
};

export const updateAd = async (req: Request, res: Response) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAd) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(updatedAd);
  } catch (error) {
    res.status(500).json({ error: 'Error updating ad' });
  }
};

export const deleteAd = async (req: Request, res: Response) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting ad' });
  }
};

export const getAd = async (req: Request, res: Response) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ad' });
  }
};

export const getAllAds = async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ads' });
  }
}; 