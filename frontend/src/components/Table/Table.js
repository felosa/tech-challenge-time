export const Table = ({ columns = [], data = [], width = "100px" }) => {
  if (data.length === 0) {
    return <p>NO RESULTS</p>;
  }

  return (
    <table className="table" style={{ width: width }}>
      <thead>
        <tr>
          {columns.length > 0 &&
            columns.map((column, index) => {
              return <th key={index}>{column.title}</th>;
            })}
        </tr>
      </thead>

      <tbody>
        {data.length > 0 &&
          data.map((session, index) => {
            return (
              <tr key={index}>
                {columns.length > 0 &&
                  columns.map((column, index2) => {
                    return (
                      <td key={index2}>
                        <p>{session[column.property]}</p>
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
