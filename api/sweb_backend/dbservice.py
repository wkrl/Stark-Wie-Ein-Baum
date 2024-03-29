import simplejson
from .main import DB
from sqlalchemy import exc


def _get_model_obj(model, id):
	if id is None:
		try:
			return DB.session.query(model)
		except exc.InvalidRequestError as e:
			print('invalid request error: {}'.format(e))
	else:
		return DB.session.query(model).get(id)


def _get_schema_obj(schema, id):
	if id is None:
		return schema(many=True)
	else:
		return schema()


def get_json_data(model, schema, id):
	output = _get_schema_obj(schema, id).dump(_get_model_obj(model, id))
	return simplejson.dumps(output, ensure_ascii=False, encoding='utf8'), 200
