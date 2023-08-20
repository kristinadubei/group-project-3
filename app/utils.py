from datetime import datetime
from app.constants import sequence_of_columns


def convert_csv_row_to_json(row):
    disaster_data = {col:val if val else None for col, val in zip(sequence_of_columns, row)}
    if disaster_data.get('Local_Time'):
        try:
            time_obj = datetime.strptime(disaster_data.get('Local_Time'), '%H:%M').time()
            disaster_data['Local_Time'] = time_obj
        except Exception as e:
            print(disaster_data.get('Local_Time'))
            disaster_data['Local_Time'] = None
    return disaster_data