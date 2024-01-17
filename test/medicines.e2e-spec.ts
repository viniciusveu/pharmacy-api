import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateMedicineDto } from '../src/medicines/dto/create-medicine.dto';

const knownUUID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
const medicineToCreate: CreateMedicineDto = {
  id: knownUUID,
  name: 'Paracetamol',
  description: 'Medicine for headaches',
  manufacturer: 'Bayer',
  batch: 1234,
  type: 'Tablet',
  posology: 'Take one tablet every 8 hours',
  indications: 'Headaches',
  contraindications: 'None',
  stockQuantity: 10,
};

describe('MedicinesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/medicines (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/medicines')
      .send(medicineToCreate)
      .expect(201);

    const createdMedicine = response.body;
    expect(createdMedicine.name).toEqual(medicineToCreate.name);
  });

  it('/medicines (GET)', async () => {
    return await request(app.getHttpServer()).get('/medicines').expect(200);
  });

  it('/medicines/:id (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/medicines/' + knownUUID)
      .expect(200);
  });

  it('/medicines/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/medicines/' + knownUUID)
      .send(medicineToCreate)
      .expect(200);

    const updatedMedicine = response.body;
    expect(updatedMedicine.affected).toEqual(1);
  });

  it('/medicines/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/medicines/' + knownUUID)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
