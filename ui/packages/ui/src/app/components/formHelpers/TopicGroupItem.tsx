import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Select,
  SelectOption,
  SelectVariant, TextInput, Tooltip
} from "@patternfly/react-core";
import { MinusCircleIcon } from "@patternfly/react-icons";
import * as React from "react";
import "./TopicGroupItem.css";

export interface ITopicGroupItemProps {
  rowId: number;
  nameValue: string;
  includeValue: string;
  replicationFactorValue: string;
  partitionsValue: string;
  retentionMsValue: string;
  cleanupPolicyValue: string;
  compressionTypeValue: string;
  canDelete: boolean;
  i18nRemoveTopicGroupTooltip: string;
  topicGroupItemChanged: (rowId: number, topicGroupValue: string) => void;
  deleteTopicGroupItem: (rowId: number) => void;
}

export const TopicGroupItem: React.FunctionComponent<ITopicGroupItemProps> = (
  props
) => {
  const [isCleanupSelectOpen, setCleanupSelectOpen] = React.useState<boolean>(false)
  const [isCompressionSelectOpen, setCompressionSelectOpen] = React.useState<boolean>(false)

  const onCleanupSelectToggle = (open: boolean) => {
    setCleanupSelectOpen(open)
  };
  const onCompressionSelectToggle = (open: boolean) => {
    setCompressionSelectOpen(open)
  };

  const cleanupPolicyOptions = [
    {"value": "Choose Policy...", isPlaceholder: true},
    {"value": "Cleanup Policy1"},
    {"value": "Cleanup Policy2"}, 
    {"value": "Cleanup Policy3"}
  ]

  const compressionTypeOptions = [
    {"value": "Choose Type...", isPlaceholder: true},
    {"value": "Compression Type1"},
    {"value": "Compression Type2"}, 
    {"value": "Compression Type3"}
  ]

  const handleNameChange = (val: any) => {
    handleTopicGroupValueChange(val, props.includeValue, props.replicationFactorValue, props.partitionsValue,
                                props.retentionMsValue, props.cleanupPolicyValue, props.compressionTypeValue);
  }

  const handleIncludeChange = (val: any) => {
    handleTopicGroupValueChange(props.nameValue, val, props.replicationFactorValue, props.partitionsValue,
      props.retentionMsValue, props.cleanupPolicyValue, props.compressionTypeValue);
}

  const handleCleanupPolicyChange = (event: any, selection: any, isPlaceholder: any) => {
    const cleanupPolicyVal = isPlaceholder ? '' : selection;
    setCleanupSelectOpen(false);

    handleTopicGroupValueChange(props.nameValue, props.includeValue, props.replicationFactorValue, props.partitionsValue,
      props.retentionMsValue, cleanupPolicyVal, props.compressionTypeValue);
  };

  const handleCompressionTypeChange = (event: any, selection: any, isPlaceholder: any) => {
    const compressionTypeVal = isPlaceholder ? '' : selection;
    setCompressionSelectOpen(false);

    handleTopicGroupValueChange(props.nameValue, props.includeValue, props.replicationFactorValue, props.partitionsValue,
      props.retentionMsValue, props.cleanupPolicyValue, compressionTypeVal);
  };

  const handleReplicationFactorChange = (val: any) => {
    handleTopicGroupValueChange(props.nameValue, props.includeValue, val, props.partitionsValue,
      props.retentionMsValue, props.cleanupPolicyValue, props.compressionTypeValue);
  }

  const handlePartitionsChange = (val: any) => {
    handleTopicGroupValueChange(props.nameValue, props.includeValue, props.replicationFactorValue, val,
      props.retentionMsValue, props.cleanupPolicyValue, props.compressionTypeValue);
  }

  const handleRetentionChange = (val: any) => {
    handleTopicGroupValueChange(props.nameValue, props.includeValue, props.replicationFactorValue, props.partitionsValue,
      val, props.cleanupPolicyValue, props.compressionTypeValue);
  }

  const handleTopicGroupValueChange = (name: any, include: any, replication: any, partitions: any,
                                       retention: any, cleanupPolicy: any, compressionType: any) => {
    const newValue = name + "&&" + include + "||" + replication + "$$" + partitions + "%%" + retention + "^^" + cleanupPolicy + "**" + compressionType;
    props.topicGroupItemChanged(props.rowId, newValue);
  }

  const handleRemoveItemClick = () => {
    props.deleteTopicGroupItem(props.rowId);
  }

  const handleKeyPress = (keyEvent: KeyboardEvent) => {
    // do not allow entry of '.' or '-'
    if (keyEvent.key === "." || keyEvent.key === "-") {
      keyEvent.preventDefault();
    }
  };

  return (
    <Grid className={"topic-group-item"}>
      {/* First Row - Name */}
      <GridItem span={4}>
        <Flex className={"topic-group-item-name"}>
          <FlexItem className={"topic-group-item-label topic-group-item-name-input"}>
            <span>Name:</span> <TextInput
              data-testid={`${props.rowId}name`}
              id={`${props.rowId}name`}
              type={"text"}
              onChange={handleNameChange}
              value={props.nameValue}
              onKeyPress={(event) => handleKeyPress(event as any)}
            />
          </FlexItem>
        </Flex>
      </GridItem>
      {/* Second Includes  */}
      <GridItem span={11}>
        <Flex className={"topic-group-item-includes"}>
          <FlexItem className={"topic-group-item-label topic-group-item-includes-input"}>
            <span>Include:</span> <TextInput
              data-testid={`${props.rowId}include`}
              id={`${props.rowId}include`}
              type={"text"}
              onChange={handleIncludeChange}
              value={props.includeValue}
              onKeyPress={(event) => handleKeyPress(event as any)}
            />
          </FlexItem>
        </Flex>
      </GridItem>
      {props.canDelete ? (
        <GridItem span={1}>
          <Flex className={"topic-group-item-remove-button"}>
            <FlexItem>
              <Tooltip position="right" content={props.i18nRemoveTopicGroupTooltip}>
                <MinusCircleIcon
                  className={"topic-group-item-remove-button-icon"}
                  onClick={handleRemoveItemClick}
                />
              </Tooltip>
            </FlexItem>
          </Flex>
        </GridItem>
      ) : null}

      {/* Third Row - Replication Factor, Partitions, Retention duration */}
      <GridItem span={4}>
        <Flex className={"topic-group-item-replication-factor"}>
          <FlexItem className={"topic-group-item-label topic-group-item-replication-factor-input"}>
            <span>Replication Factor:</span> <TextInput
              data-testid={`${props.rowId}replication-factor`}
              id={`${props.rowId}replication-factor`}
              min={"1"}
              type={"number"}
              onChange={handleReplicationFactorChange}
              value={props.replicationFactorValue}
              onKeyPress={(event) => handleKeyPress(event as any)}
            />
          </FlexItem>
        </Flex>
      </GridItem>
      <GridItem span={4}>
        <Flex>
          <FlexItem className={"topic-group-item-label"}>
            <span>Partitions:</span> <TextInput
              data-testid={`${props.rowId}partitions`}
              id={`${props.rowId}partitions`}
              min={"1"}
              type={"number"}
              onChange={handlePartitionsChange}
              value={props.partitionsValue}
              onKeyPress={(event) => handleKeyPress(event as any)}
            />
          </FlexItem>
        </Flex>
      </GridItem>
      <GridItem span={4}>
        <Flex>
          <FlexItem className={"topic-group-item-label"}>
            <span>Retention:</span> <TextInput
              data-testid={`${props.rowId}retention`}
              id={`${props.rowId}retention`}
              min={"1"}
              type={"number"}
              onChange={handleRetentionChange}
              value={props.retentionMsValue}
              onKeyPress={(event) => handleKeyPress(event as any)}
            />
          </FlexItem>
        </Flex>
      </GridItem>

      {/* Third Row - Cleanup Policy, Compression Type */}
      <GridItem span={4}>
        <Flex className={"topic-group-item-cleanup-policy"}>
          <FlexItem className={"topic-group-item-label topic-group-item-cleanup-policy-input"}>
            <span>Cleanup Policy:</span> <Select
              variant={SelectVariant.single}
              aria-label="Select Input"
              onToggle={onCleanupSelectToggle}
              onSelect={handleCleanupPolicyChange}
              selections={props.cleanupPolicyValue}
              isOpen={isCleanupSelectOpen}
            >
              {cleanupPolicyOptions.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  isPlaceholder={option.isPlaceholder}
                />
              ))}
            </Select>
          </FlexItem>
        </Flex>
      </GridItem>
      <GridItem span={4}>
        <Flex>
          <FlexItem
            className="topic-group-item-label"
          >
            <span>Compression Type:</span> <Select
              variant={SelectVariant.single}
              aria-label="Select Compression Type Input"
              onToggle={onCompressionSelectToggle}
              onSelect={handleCompressionTypeChange}
              selections={props.compressionTypeValue}
              isOpen={isCompressionSelectOpen}
            >
              {compressionTypeOptions.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  isPlaceholder={option.isPlaceholder}
                />
              ))}
            </Select>
          </FlexItem>
        </Flex>
      </GridItem>
    </Grid>
  );
};
