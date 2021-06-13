import Service from '../models/Service';

class ServicesController {
    async store(req, res) {
        const { name, duration, price, id_user } = req.body;

        const response = await Service.create({
            name,
            duration,
            price,
            id_user
        });

        return res.status(200).json({
            message: 'Serviço cadastrado com sucesso!',
            Service: response,
            success: true,
        });

    }

    async index(req, res) {
        const { id } = req.params;
        const response = await Service.findAll({
            raw: true,
            where: [
                { id_user: id }
            ]
        });

        return res.status(200).json(response);
    }

    async indexAll(req, res) {
        const response = await Service.findAll();
        return res.status(200).json(response);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, duration, price, id_user } = req.body;

        const service = await Service.findByPk(id);

        const response = await service.update({
            name,
            duration,
            price,
            id_user
        });

        return res.status(200).json({
            message: 'Serviço atualizado com sucesso!',
            service: response,
            success: true,
        });
    }

    async destroy(req, res) {
        const { id } = req.params;

        const listId = id.split(',');

        listId.map(async id => {
            await Service.destroy({ where: { id } });
        });

        return res.json({
            message: 'Serviço(s) deletado(s) com sucesso!',
            success: true,
        });
    }
}

export default new ServicesController();