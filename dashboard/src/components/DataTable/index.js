import tableStyles from './DataTable.module.scss';

const DataTable = ({ data, toggle }) => {
  return (
    <section className={tableStyles.container}>
      <button onClick={() => toggle()} className={tableStyles.closeBtn}>
        X
      </button>
      <table className={tableStyles.DataTable}>
        <thead className={tableStyles.tableHead}>
          <tr>
            <td>pH Value</td>
            <td>pH Value Status</td>
            <td>pH Value Action</td>
            <td>Water Conductivity</td>
            <td>Water Conductivity Status</td>
            <td>Water Conductivity Action</td>
            <td>Dissolved Oxygen</td>
            <td>Dissolved Oxygen Action</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody className={tableStyles.tableBody}>
          {data &&
            data.map((item) => {
              const { ph, dissolved, conductivity, createdAt, _id } = item;
              const { phVal, acidPump, alkalinePump } = ph;
              const { dissolvedVal, heater } = dissolved;
              const { conductivityVal, waterPump } = conductivity;

              return (
                <tr key={_id}>
                  <td>{phVal}</td>
                  <td>
                    {phVal > 9 ? 'pH High' : phVal < 6 ? 'pH Low' : 'pH Normal'}
                  </td>
                  <td>
                    Acid Pump {acidPump ? 'ON' : 'OFF'} <br />
                    Alkaline Pump {alkalinePump ? 'ON' : 'OFF'}
                  </td>
                  <td>{conductivityVal}</td>
                  <td>
                    {conductivityVal > 10000
                      ? 'water Conductivity High'
                      : 'water Conductivity Optimal'}
                  </td>
                  <td>Water Pump {waterPump ? 'ON' : 'OFF'}</td>
                  <td>{dissolvedVal.toUpperCase()}</td>
                  <td>Heater {heater ? 'ON' : 'OFF'}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;
