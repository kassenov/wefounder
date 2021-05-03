import { Company } from '../entities/Company';
import { getRepository } from 'typeorm';

export const CompanyFactory = {
  build: (attrs: Partial<Company> = {}) => {
    const companyAttrs: Partial<Company> = {
      ...attrs
    };

    return getRepository(Company).create(companyAttrs);
  },

  create: async (attrs: Partial<Company> = {}) => {
    const company = CompanyFactory.build(attrs);
    const createdCompany = await getRepository(Company).save(company);

    return createdCompany;
  },
}