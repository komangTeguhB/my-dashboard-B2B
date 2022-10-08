import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import { Grid, Container, Typography, Stack, Box, Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, CardContent } from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { DateRangePicker } from 'react-date-range';
import { addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from 'date-fns';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import SkuItem from '../components/SkuItem';
import AppAveragePurchase from '../components/AppAveragePurchase';
import AveragePurchase from "../mock/averagePurchase";
import ListSku from "../mock/listSku";


const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

const staticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Yesterday',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },
  {
    label: 'Last 7 days',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: 'Last 30 days',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
]);

export default function DashboardApp() {
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const [expanded, setExpanded] = useState(false);
  const [charData, setChartData] = useState(AveragePurchase[0].details);
  const [dState, setDState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const chartLabelsValue = [
    dState[0].startDate.toLocaleDateString('id-ID'),
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    dState[0].endDate.toLocaleDateString('id-ID'),
  ]

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCalendarChange = (item) => {
    setDState(item);
    const tempData = AveragePurchase.filter((element) => element.startDate === item[0].startDate.toLocaleDateString('id-ID') 
                    && element.endDate === item[0].endDate.toLocaleDateString('id-ID'))
    if (tempData.length > 0) {
      setChartData(tempData[0].details);
    } 
  }

  function renderTopCard() {
    return (
      <Grid container spacing={3} style={{paddingBottom: '20px'}}>
          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <CardHeader title={"Sales Turnover"} titleTypographyProps={{variant: "body1", color: 'text.secondary'}}/>
              <CardContent
                sx={{
                  '& .MuiTimelineItem-missingOppositeContent:before': {
                    display: 'none',
                  },
                }}
               >
                 <Grid container spacing={3}>
                   <Grid item xs={9} md={9} lg={9}>
                    <Typography variant="h3">
                      RP 3,600,000
                    </Typography>
                    <Typography variant="caption">
                      <span style={{color: 'red'}}><Iconify icon="entypo:arrow-long-down"/> 13.8%</span> last period in products sold
                    </Typography>
                   </Grid>
                   <Grid item xs={3} md={3} lg={3}>
                      <Iconify icon="tabler:shopping-cart-discount" height={55} width={55}/>
                   </Grid>
                 </Grid>
               
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    )
  }

  function renderItemSKU(cardTitle) {
    return (
            <Card>
              <CardHeader title={cardTitle}/>
              <CardContent>
                {ListSku.map((item, index) => (
                   <SkuItem data={item} key={index} />
                ))}
              </CardContent>
            </Card>
    )
  }

  return (
    <Page title="My Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ color: 'text.secondary', width: '60%'}}>
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '100%', flexShrink: 0 }}>
              <Iconify icon="fa:calendar" width={24} height={24} />
                <span style={{paddingLeft: '15px', paddingBottom: '10px'}}>Period </span>
                <span style={{paddingLeft: '50px'}}> 
                  {dState[0].startDate.toLocaleDateString('id-ID', dateFormatOptions)}&nbsp;-&nbsp;{dState[0].endDate.toLocaleDateString('id-ID', dateFormatOptions)}
                </span>
              </Typography>
             </AccordionSummary>
            <AccordionDetails style={{position: 'absolute', right: '5px', zIndex: 1}}>
              <DateRangePicker
                  onChange={(item) => handleCalendarChange([item.selection])}
                  showSelectionPreview
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dState}
                  direction="horizontal"
                  staticRanges={staticRanges}
                  rangeColors={[
                    "#0ad600",
                    '#3ecf8e', 
                    '#fed14c'
                  ]}
                />
            </AccordionDetails>
          </Accordion>
          </Box>
        </Stack>

        {renderTopCard()}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppAveragePurchase
              title="AVERAGE PURCHASE VALUE"
              chartLabels={chartLabelsValue}
              chartData={charData}
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            {renderItemSKU("BEST SELLING SKU")}
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            {renderItemSKU("TOP COMPETITOR SKU")}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
