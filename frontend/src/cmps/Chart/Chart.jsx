import { Sparklines, SparklinesLine } from 'react-sparklines';
import './chart.scss';

export function chart({ data, title }) {
  return (
    <div>
      <h2>{title}</h2>
      <Sparklines
          data={data}
          width={50}
          height={20}
        >
          <SparklinesLine style={{ strokeWidth: 0.2, fill: 'none', stroke: "#559500" }}/>
        </Sparklines>
    </div>
  );
}
