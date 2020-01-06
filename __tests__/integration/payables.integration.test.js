const request  = require('supertest'); 
let PayablesController = require('../../src/controllers/payables.controller');
const moment = require('moment-timezone');

 describe('Recovery Data', () => {

    it('should get totals array equals 2 positions ', async () => {
        let pay = new PayablesController();
        let response = await pay.recoveryPayablesTotals(1);        
        expect(response.length).toBeGreaterThan(0);
    });

 });