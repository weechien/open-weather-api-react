import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector, useEnterPress } from '../../app/hooks';
import { Button } from '../../components/Button';
import { CardContent, CardHeader } from '../../components/Card';
import { DetailCard } from '../../components/DetailCard';
import { Error } from '../../components/Error';
import { Icon, SearchIcon, TrashIcon } from '../../components/Icon';
import { Line } from '../../components/Line';
import { SearchInput } from '../../components/SearchInput';
import { Text } from '../../components/Text';
import { ViewContainer } from '../../components/ViewContainer';
import { WeatherActions, WeatherSelectors } from '../../features';
import { device } from '../../themes/default';

const StyledContainer = styled(ViewContainer)`
  gap: 2rem;
`;

const StyledCardHeader = styled(CardHeader)`
  margin-bottom: 0rem;
`;

const StyledCardContent = styled(CardContent)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  grid-gap: ${({ theme }) => theme.layoutPadding};
  flex-wrap: wrap;
  width: 100%;
`;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.layoutPadding};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 1rem;
  padding: 2rem;
`;

const StyledIcon = styled(Icon)`
  width: 1.6rem;
  margin-right: 0.5rem;
  fill: ${(props) => props.theme.colors.secondary};
  :hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  @media ${device.tabletL} {
    width: 100%;
  }
`;

export const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const selectedSearchHistory = useAppSelector(WeatherSelectors.selectSearchHistory);
  // Useful to display loading state during fetch
  // const selectedLoading = useAppSelector(WeatherSelectors.selectLoading);
  const selectedHasError = useAppSelector(WeatherSelectors.selectHasError);
  const {
    city: displayCity,
    country: displayCountry,
    main,
    description,
    temperature,
    humidity,
    time
  } = useAppSelector(WeatherSelectors.selectDisplayWeather);
  const dispatch = useAppDispatch();

  useEnterPress({
    onEnterPress: () => dispatch(WeatherActions.searchLocationWeather({ city: city, country: country }))
  });

  const onSearch = useCallback(() => {
    dispatch(WeatherActions.searchLocationWeather({ city: city, country: country }));
  }, [city, country]);

  const onClear = useCallback(() => {
    setCity('');
    setCountry('');
    dispatch(WeatherActions.updateError({ hasError: false }));
  }, []);

  const hasDisplayData = displayCity && displayCountry && main && description && temperature && humidity && time;

  return (
    <StyledContainer>
      <StyledCardHeader header="Today’s Weather">
        <Line />
      </StyledCardHeader>

      <StyledRow>
        <StyledCardContent>
          <Text>City:</Text>
          <SearchInput searchText={city} setSearchText={setCity} />
        </StyledCardContent>
        <StyledCardContent>
          <Text>Country:</Text>
          <SearchInput searchText={country} setSearchText={setCountry} />
        </StyledCardContent>
        <StyledButton onClick={onSearch}>Search</StyledButton>
        <StyledButton onClick={onClear}>Clear</StyledButton>
      </StyledRow>

      {selectedHasError && (
        <StyledRow>
          <Error errorType="warning" errorText="Not found" />
        </StyledRow>
      )}

      {hasDisplayData && (
        <DisplayContainer>
          <StyledRow>
            <Text>{`${displayCity}, ${displayCountry}`}</Text>
          </StyledRow>
          <StyledRow>
            <Text size={40} fontSize={40}>
              {main}
            </Text>
          </StyledRow>
          <StyledRow>
            <Text minWidth={100}>Description:</Text>
            <Text>{description}</Text>
          </StyledRow>
          <StyledRow>
            <Text minWidth={100}>Temperature:</Text>
            <Text>{temperature}</Text>
          </StyledRow>
          <StyledRow>
            <Text minWidth={100}>Humidity:</Text>
            <Text>{humidity}</Text>
          </StyledRow>
          <StyledRow>
            <Text minWidth={100}>Time:</Text>
            <Text>{time}</Text>
          </StyledRow>
        </DisplayContainer>
      )}

      <DetailCard
        header="Search History"
        metadata={[
          {
            key: 'searchLocation',
            align: 'flex-start',
            width: 'auto',
            grow: '1'
          },
          {
            key: 'searchTime',
            fontWeight: 600,
            width: '17rem'
          },
          {
            key: 'searchIcon',
            transform: ({ searchIcon: { city, country } }) => (
              <StyledIcon
                Component={SearchIcon}
                onClick={() =>
                  dispatch(
                    WeatherActions.searchLocationWeather({
                      city: city,
                      country: country,
                      shouldUpdateSearchHistory: false
                    })
                  )
                }
              />
            ),
            width: '8rem'
          },
          {
            key: 'trashIcon',
            transform: ({ trashIcon: { searchHistory } }) => (
              <StyledIcon
                Component={TrashIcon}
                onClick={() => dispatch(WeatherActions.removeSearchHistory({ searchHistory }))}
              />
            ),
            width: '8rem'
          }
        ]}
        data={selectedSearchHistory.map(({ city, country, datetime }) => ({
          searchLocation: `${city}, ${country}`,
          searchTime: datetime.display,
          searchIcon: { city, country },
          trashIcon: { searchHistory: { city, country, datetime } }
        }))}
        initialSortBy="searchTime"
        wrap
      />
    </StyledContainer>
  );
};
