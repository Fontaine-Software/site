import Box from '../../components/box/Box';
import Text from "../../components/text/Text";
import Accordion from "../../components/accordion/Accordion"
import Card from "../../components/card/Card";
import { changelog, upcoming } from './changelog.dump';

import "./ChangeLog.styles.scss"

// const changelog = lazy(() => import("./changelog.dump"));

export default function ChangeLog() {

    return (
      <Box col>
        <Box className="pad-10-b ali-cen">
          <Text heading={5} className={"pad-10 mar-0"}>Changelog - SKU Manager</Text>
        </Box>
        <Box col className={"changelog-container"} pad={'0'}>
          <Box col className={"overflow-container no-scroll"}>
            {/* ======= UPCOMING ======= */}
            <Accordion 
              title={
                <Box gap={10}>
                  <Text>Upcoming</Text>
                  <Text
                    label='info'
                    className='fs-12'
                  >
                    Updated
                  </Text>
                </Box>
              }
              thick
            >
              <Box col gap={10} pad={15}>
                <Text>Last updated: {upcoming.date} </Text>
                {Array.isArray(upcoming.new) && upcoming.new.map((upc, index) => (
                  <Box key={index + "upcN"} className={"ali-cen"}>
                    <Text label={"info"}>Planned</Text>
                    <Text>{upc}</Text>
                  </Box>
                ))}
              </Box>
            </Accordion>
            {/* ======= CHANGELOG ======= */}
            {Array.isArray(changelog) &&
              changelog.map((versionItem) => {
                const isOpened = changelog[0].version === versionItem.version;

                // Reusable render function for change types
                const renderChanges = (items, label, labelType, keyPrefix) =>
                  items?.map((item, itemIndex) => (
                    <Box key={`${keyPrefix}-${itemIndex}`}>
                      <Text label={labelType}>{label}</Text>
                      <Text>{item}</Text>
                    </Box>
                  ));

                return (
                  <Accordion
                    title={`${versionItem.version} - ${versionItem.date}`}
                    key={`${versionItem.version}-accordion`}
                    opened={isOpened}
                    thick
                  >
                    <Box col gap={10} pad={15}>
                      {renderChanges(versionItem?.new, "Added", "success", "new")}
                      {renderChanges(versionItem?.improved, "Improved", "info", "improved")}
                      {renderChanges(versionItem?.fixed, "Fixed", "grey", "fixed")}
                      {renderChanges(versionItem?.note, "Note", "warning", "note")}
                      {renderChanges(versionItem?.bad, "Alert", "critical", "bad")}
                    </Box>
                  </Accordion>
                );
              })}
          </Box>
        </Box>
      </Box>
    )
}