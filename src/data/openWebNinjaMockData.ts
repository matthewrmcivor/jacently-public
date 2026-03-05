import { Event } from './mockEvents';
import { transformOpenWebNinjaEventToEvent } from '../services/openData/openWebNinjaService';
import type { OpenWebNinjaEvent } from '../services/openData/openWebNinjaService';

// Raw mock data from OpenWebNinja API response
const openWebNinjaMockResponse: OpenWebNinjaEvent[] = [
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTI4fDE1MDU2MzcyMDA2NDUyMzM0OTkx",
    "name": "An Evening with Sarah McLachlan - The Better Broken Tour",
    "link": "https://www.nobhillgazette.com/local-events/?_evDiscoveryPath=/event/1036585544n-sarah-mclachlan",
    "description": "Doors open at 6:30pm An Evening with Sarah McLachlan Sarah McLachlan (born Sarah Ann McLachlan January 28, 1968 in Halifax, Nova Scotia, Canada) is a Grammy-winning musician, singer and...",
    "language": "en",
    "date_human_readable": "Fri, Nov 28, 7:00 – 9:30 PM PST",
    "start_time": "2025-11-28 19:00:00",
    "start_time_utc": "2025-11-29 03:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-28 21:30:00",
    "end_time_utc": "2025-11-29 05:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkFaep1o-rCKRrpKfFaGD5xiyzA881SgAyEg-CWj2b8A&s=10",
    "publisher": "Nobhillgazette.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.nobhillgazette.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "www.nobhillgazette.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/3KdHOBvoX7sNKYiEFCOF3S",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fan-evening-with-sarah-mclachlan-the-san-francisco-california-11-28-2025%2Fevent%2F1C00632CB97B4742&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-25804?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-86854%7Cev-159435775%7Ccy-6208&ps_ev=159435775",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-25804?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-86854%7Cev-159435775%7Ccy-6208&ps_ev=159435775",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/sarah-mclachlan-tickets-san-francisco-the-masonic---san-francisco-11-28-2025--concerts-pop/production/6050627",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Nobhillgazette.com",
        "link": "https://www.nobhillgazette.com/local-events/?_evDiscoveryPath=/event/1036585544n-sarah-mclachlan"
      }
    ],
    "venue": {
      "google_id": "0x8085809283a76d81:0xad7599e9a61b46be",
      "name": "The Masonic",
      "phone_number": "+14153437582",
      "website": "https://www.sfmasonic.com",
      "review_count": 2857,
      "rating": 4.5,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Event ticket seller",
        "Performing arts theater"
      ],
      "full_address": "The Masonic, 1111 California St, San Francisco, CA 94108",
      "latitude": 37.791198,
      "longitude": -122.4129823,
      "district": "Nob Hill",
      "street_number": "1111",
      "street": "1111 California St",
      "city": "San Francisco",
      "zipcode": "94108",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/m/04cttcm"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTI4fDE3ODQ2MzM2OTczMDk5MDkwMTkx",
    "name": "Barbie The Movie In Concert",
    "link": "https://dothebay.com/events/2025/11/28/barbie-the-movie-in-concert-tickets",
    "description": "She's everything. And now she's backed by a live orchestra.\tWatch Barbie (2023) on the big screen while the San Francisco Symphony performs the full score — yes, including that Billie Eilish song...",
    "language": "en",
    "date_human_readable": "Fri, Nov 28, 7:30 – 9:00 PM",
    "start_time": "2025-11-28 19:30:00",
    "start_time_utc": "2025-11-28 19:30:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-28 21:00:00",
    "end_time_utc": "2025-11-28 21:00:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQev2WKjsykDaYLnp_GNIh3aH7SLMwInNecfCM8Rdersw&s=10",
    "publisher": "Dothebay.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://dothebay.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "dothebay.com",
    "ticket_links": [
      {
        "source": "Sfsymphony.org",
        "link": "https://www.sfsymphony.org/Buy-Tickets/2025-26/BARBIE-IN-CONCERT",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://sfsymphony.org&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ode.fm",
        "link": "https://ode.fm/event/5774",
        "fav_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://ode.fm&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Tickpick.com",
        "link": "https://www.tickpick.com/buy-tickets/7066468",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://tickpick.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/barbie-the-movie-in-concert-tickets/orchestral/2025-11-28-7-30-pm/17630315?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=86.73",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-150225096?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2016%7Cev-157738587%7Ccy-79823&ps_ev=157738587",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Dothebay.com",
        "link": "https://dothebay.com/events/2025/11/28/barbie-the-movie-in-concert-tickets"
      }
    ],
    "venue": {
      "google_id": "0x808580991be02fd9:0xc60bb460e5f31987",
      "name": "Louise M. Davies Symphony Hall",
      "phone_number": "+14158646000",
      "website": "https://www.sfsymphony.org",
      "review_count": 597,
      "rating": 4.8,
      "subtype": "Concert hall",
      "subtypes": [
        "Concert hall"
      ],
      "full_address": "Louise M. Davies Symphony Hall, 201 Van Ness Ave, San Francisco, CA 94102",
      "latitude": 37.7779294,
      "longitude": -122.42080879999999,
      "district": "Civic Center",
      "street_number": "201",
      "street": "201 Van Ness Ave",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11hcdwbfxd"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTEyLTA4fDE0NzM1OTcyMzA5NzYxNTIzNjU2",
    "name": "Mario",
    "link": "https://www.nobhillgazette.com/events/calendar/?_evDiscoveryPath=/event/107372477n-mario",
    "description": "Mario is an R&B artist from the US. He began his career with the Biz Markie cover, \"Just a Friend 2002\", the lead single to his self-titled debut album, which went Gold without much critical...",
    "language": "en",
    "date_human_readable": "Mon, Dec 8, 7:00 – 9:30 PM PST",
    "start_time": "2025-12-08 19:00:00",
    "start_time_utc": "2025-12-09 03:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-12-08 21:30:00",
    "end_time_utc": "2025-12-09 05:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Qzq9mgcohj5TC0jktMz3NY5d7c4fBHqAI9hSNPlMKw&s=10",
    "publisher": "Nobhillgazette.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.nobhillgazette.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "www.nobhillgazette.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/4bZW9wjsJRVVLm2cOSLemq",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fmario-presents-the-nothing-but-us-san-francisco-california-12-08-2025%2Fevent%2F1C006329B7883449&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/mario-tickets-san-francisco-august-hall-12-8-2025--concerts-rb/production/6018574",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/mario-tickets/san-francisco-california-august-hall-2025-12-08-8-pm/concert/17736834?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=31.35",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-84144?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-44935%7Cev-159419897%7Ccy-79823&ps_ev=159419897",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Nobhillgazette.com",
        "link": "https://www.nobhillgazette.com/events/calendar/?_evDiscoveryPath=/event/107372477n-mario"
      }
    ],
    "venue": {
      "google_id": "0x8085808ef9f24ce5:0xc1b64fe9abf9792b",
      "name": "August Hall",
      "phone_number": "+14158725745",
      "website": "http://www.augusthallsf.com",
      "review_count": 959,
      "rating": 4.6,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Event venue",
        "Night club"
      ],
      "full_address": "August Hall, 420 Mason St, San Francisco, CA 94102",
      "latitude": 37.7876194,
      "longitude": -122.40981389999999,
      "district": "Union Square",
      "street_number": "420",
      "street": "420 Mason St",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11f3c1fw_d"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTI1fDE1MTYxNzc5NTAzNzMxNjQwMjA=",
    "name": "3Quency Tickets",
    "link": "https://open.spotify.com/concert/4K72pjW0Hlgbpe0brj7z2A",
    "description": "Find tickets for 3Quency with Soulidified at The Fillmore in San Francisco on 11/25/2025 at 8:00 PM",
    "language": "en",
    "date_human_readable": "Tue, Nov 25, 7:00 – 9:30 PM PST",
    "start_time": "2025-11-25 19:00:00",
    "start_time_utc": "2025-11-26 03:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-25 21:30:00",
    "end_time_utc": "2025-11-26 05:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7z24qYDZ_cc3Q7OnqTBdyWbfPH95Dnz-qCCo-aDFs2Dqdp-FS5823-xTmdQ&s=10",
    "publisher": "Spotify.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://open.spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "open.spotify.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/4K72pjW0Hlgbpe0brj7z2A",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2F3quency-with-soulidified-bandemonium-tour-2025-san-francisco-california-11-25-2025%2Fevent%2F1C006325951C4462&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/3quency-tickets-san-francisco-fillmore-san-francisco-11-25-2025--concerts-pop/production/5995719",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-150566425?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2025%7Cev-159368136%7Ccy-6208&ps_ev=159368136",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-150566425?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2025%7Cev-159368136%7Ccy-6208&ps_ev=159368136",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/4K72pjW0Hlgbpe0brj7z2A"
      }
    ],
    "venue": {
      "google_id": "0x808580b9b206613b:0x44d95eb9bc33774",
      "name": "The Fillmore",
      "phone_number": "+14153463000",
      "website": "https://www.livenation.com/venue/KovZpZAE6eeA/the-fillmore-events",
      "review_count": 2793,
      "rating": 4.7,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Banquet hall",
        "Concert hall",
        "Event planner",
        "Event ticket seller",
        "Event venue",
        "Night club",
        "Performing arts theater",
        "Stage",
        "Wedding venue"
      ],
      "full_address": "The Fillmore, 1805 Geary Blvd, San Francisco, CA 94115",
      "latitude": 37.783926,
      "longitude": -122.433072,
      "district": "Fillmore District",
      "street_number": "1805",
      "street": "1805 Geary Blvd",
      "city": "San Francisco",
      "zipcode": "94115",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/m/0259fy"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTEyLTE2fDE4NDMyOTE3NzkxMTEwMjM3Nzc0",
    "name": "Vedo",
    "link": "https://open.spotify.com/concert/2SfNKiQSTssl1uh8PmvgxP",
    "description": "Find tickets for Vedo at August Hall in San Francisco on 12/16/2025 at 8:00 PM",
    "language": "en",
    "date_human_readable": "Tue, Dec 16, 8:00 – 9:30 PM",
    "start_time": "2025-12-16 20:00:00",
    "start_time_utc": "2025-12-16 20:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-12-16 21:30:00",
    "end_time_utc": "2025-12-16 21:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkUDx7UqWOhJggZvL4uoaSdzkGMzJQaZLVWinjVuVMg&s=10",
    "publisher": "Spotify.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://open.spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "open.spotify.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/2SfNKiQSTssl1uh8PmvgxP",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fvedo-san-francisco-california-12-16-2025%2Fevent%2F1C006330E8464DD3&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/vedo-tickets-san-francisco-august-hall-12-16-2025--concerts-rb/production/6043717",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-157676?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-44935%7Cev-159431218%7Ccy-79823&ps_ev=159431218",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-157676?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-44935%7Cev-159431218%7Ccy-79823&ps_ev=159431218",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Nobhillgazette.com",
        "link": "https://www.nobhillgazette.com/events/calendar/?_evDiscoveryPath=/event/40312913t-vedo"
      }
    ],
    "venue": {
      "google_id": "0x8085808ef9f24ce5:0xc1b64fe9abf9792b",
      "name": "August Hall",
      "phone_number": "+14158725745",
      "website": "http://www.augusthallsf.com",
      "review_count": 959,
      "rating": 4.6,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Event venue",
        "Night club"
      ],
      "full_address": "August Hall, 420 Mason St, San Francisco, CA 94102",
      "latitude": 37.7876194,
      "longitude": -122.40981389999999,
      "district": "Union Square",
      "street_number": "420",
      "street": "420 Mason St",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11f3c1fw_d"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTMwfDU2OTgwNTYxODA0NzI4MDczMDA=",
    "name": "Khamari",
    "link": "https://www.livenation.com/event/G5vYZbw22BkFh/khamari",
    "description": "Khamari SUN, Nov 30, 2025 @ 8:00 PM August Hall, San Francisco, CA",
    "language": "en",
    "date_human_readable": "Sun, Nov 30, 8:00 – 9:30 PM PST",
    "start_time": "2025-11-30 20:00:00",
    "start_time_utc": "2025-12-01 04:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-30 21:30:00",
    "end_time_utc": "2025-12-01 05:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUSZvnMvFrG0IvXQRb883K72Orhnpl5ugMXka3I5y6lw&s=10",
    "publisher": "Live Nation",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.livenation.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "www.livenation.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/21968xjmAGIGIM7okwXzUZ",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fkhamari-san-francisco-california-11-30-2025%2Fevent%2F1C006323CFE8621B&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/khamari-tickets-san-francisco-august-hall-11-30-2025--concerts-rb/production/5994168",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/khamari-tickets/san-francisco-california-august-hall-2025-11-30-8-pm/concert/17723360?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=135.57",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-150177556?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-44935%7Cev-159353102%7Ccy-79823&ps_ev=159353102",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Nobhillgazette.com",
        "link": "https://www.nobhillgazette.com/events/calendar/?_evDiscoveryPath=/event/40214070t-khamari"
      }
    ],
    "venue": {
      "google_id": "0x8085808ef9f24ce5:0xc1b64fe9abf9792b",
      "name": "August Hall",
      "phone_number": "+14158725745",
      "website": "http://www.augusthallsf.com",
      "review_count": 959,
      "rating": 4.6,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Event venue",
        "Night club"
      ],
      "full_address": "August Hall, 420 Mason St, San Francisco, CA 94102",
      "latitude": 37.7876194,
      "longitude": -122.40981389999999,
      "district": "Union Square",
      "street_number": "420",
      "street": "420 Mason St",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11f3c1fw_d"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTEyLTEyfDE4MTQ3Njk2NzIyMzY2MDUwNTQ2",
    "name": "The Music of Hans Zimmer",
    "link": "https://www.broadwaytheatresanfrancisco.com/events/the-epic-music-from-the-lord-of-the-rings-the-hobbit-the-rings-of-power-the-concert-13-december-2025/",
    "description": "By subscribing to this news letter you will receive regular updates from a third party with upcoming concerts and entertainment events.",
    "language": "en",
    "date_human_readable": "Sat, Dec 13, 3:00 – 4:30 PM PST",
    "start_time": "2025-12-13 15:00:00",
    "start_time_utc": "2025-12-13 23:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-12-13 16:30:00",
    "end_time_utc": "2025-12-14 00:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrXG377fKBoxJDTKtrKcNENFzgz8LE1CrTZ4gfb9u9Nw&s=10",
    "publisher": "Orpheum Theatre San Francisco",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.broadwaytheatresanfrancisco.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "www.broadwaytheatresanfrancisco.com",
    "ticket_links": [
      {
        "source": "San-francisco-theater.com",
        "link": "https://www.san-francisco-theater.com/shows/orpheum-theater/the-music-of-hans-zimmer/tickets/calendar",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://san-francisco-theater.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Broadwaytheatresanfrancisco.com",
        "link": "https://www.broadwaytheatresanfrancisco.com/events/the-music-of-hans-zimmer-and-others-13-december-2025/",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://broadwaytheatresanfrancisco.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/the-music-of-hans-zimmer-tickets/orchestral/2025-12-13-8-pm/17691137?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=119.62",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-150109154?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-31679%7Cev-158994730%7Ccy-6208&ps_ev=158994730",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-150109154?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-31679%7Cev-158994730%7Ccy-6208&ps_ev=158994730",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Dailycal.org",
        "link": "https://www.dailycal.org/local-events/?_evDiscoveryPath=/event/39654245t-the-music-of-hans-zimmer-and-others"
      }
    ],
    "venue": {
      "google_id": "0x8085808e5211a1ef:0x2572614e49e2c2af",
      "name": "Orpheum Theatre",
      "phone_number": "+18887461799",
      "website": "https://broadwaysf.com/Online/default.asp",
      "review_count": 5778,
      "rating": 4.7,
      "subtype": "Performing arts theater",
      "subtypes": [
        "Performing arts theater"
      ],
      "full_address": "Orpheum Theatre, 1192 Market St, San Francisco, CA 94102",
      "latitude": 37.7791786,
      "longitude": -122.41453759999999,
      "district": "Civic Center",
      "street_number": "1192",
      "street": "1192 Market St",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/m/02r7vr1"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTI5fDk4MTA3NzM1OTIxMDY0NzI5MTA=",
    "name": "Jackie Greene",
    "link": "https://open.spotify.com/concert/7CMup6AFi4WZMIEQIZRAsF",
    "description": "Find tickets for Jackie Greene at The Fillmore in San Francisco on 11/29/2025 at 8:00 PM",
    "language": "en",
    "date_human_readable": "Sat, Nov 29, 8:00 – 9:30 PM",
    "start_time": "2025-11-29 20:00:00",
    "start_time_utc": "2025-11-29 20:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-29 21:30:00",
    "end_time_utc": "2025-11-29 21:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOgNhJ4QjO1kUOhChLEXYKOP2za6DQaQOZP_WmAx-ovvo4X-bWynX1glhxQA&s=10",
    "publisher": "Spotify.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://open.spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "open.spotify.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/7CMup6AFi4WZMIEQIZRAsF",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Ticketmaster.com",
        "link": "https://ticketmaster.evyy.net/c/4135324/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjackie-greene-san-francisco-california-11-29-2025%2Fevent%2F1C0063218F3811AF%3Futm_content%3Dhotevent&utm_medium=affiliate",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://evyy.net&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Festivaly.eu",
        "link": "https://festivaly.eu/en/jackie-greene-the-fillmore-san-francisco-2025",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://festivaly.eu&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-36341?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2025%7Cev-159464576%7Ccy-6208&ps_ev=159464576",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-36341?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2025%7Cev-159464576%7Ccy-6208&ps_ev=159464576",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/7CMup6AFi4WZMIEQIZRAsF"
      }
    ],
    "venue": {
      "google_id": "0x808580b9b206613b:0x44d95eb9bc33774",
      "name": "The Fillmore",
      "phone_number": "+14153463000",
      "website": "https://www.livenation.com/venue/KovZpZAE6eeA/the-fillmore-events",
      "review_count": 2793,
      "rating": 4.7,
      "subtype": "Live music venue",
      "subtypes": [
        "Live music venue",
        "Banquet hall",
        "Concert hall",
        "Event planner",
        "Event ticket seller",
        "Event venue",
        "Night club",
        "Performing arts theater",
        "Stage",
        "Wedding venue"
      ],
      "full_address": "The Fillmore, 1805 Geary Blvd, San Francisco, CA 94115",
      "latitude": 37.783926,
      "longitude": -122.433072,
      "district": "Fillmore District",
      "street_number": "1805",
      "street": "1805 Geary Blvd",
      "city": "San Francisco",
      "zipcode": "94115",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/m/0259fy"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTExLTMwfDEzNzc3NDI3ODMxODYyODA0MzAz",
    "name": "San Francisco Symphony - A Merryachi Christmas",
    "link": "https://www.san-francisco-theater.com/dates/2025/11/category/holiday",
    "description": "A festive fiesta like no other, don't miss the delights of Merry-achi Christmas, a jovial celebration of the season featuring the best in Mexican and American holiday traditions as interpreted by...",
    "language": "en",
    "date_human_readable": "Sun, Nov 30, 2:00 – 3:30 PM PST",
    "start_time": "2025-11-30 14:00:00",
    "start_time_utc": "2025-11-30 22:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-11-30 15:30:00",
    "end_time_utc": "2025-11-30 23:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvVF1NvrvFjIO96MegYtWTrWJvVt9sRcJtqVVwZugHtBQ2F2I0FbX9VwDSw&s=10",
    "publisher": "San Francisco Theater",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.san-francisco-theater.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "www.san-francisco-theater.com",
    "ticket_links": [
      {
        "source": "San-francisco-theater.com",
        "link": "https://www.san-francisco-theater.com/shows/davies-symphony-hall/merry-achi-christmas/tickets/calendar",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://san-francisco-theater.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/san-francisco-opera-san-francisco-tickets-11-30-2025/event/158997878/",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/san-francisco-symphony-tickets/orchestral/2025-11-30-2-pm/17650238?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=118.05",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Viagogo.com",
        "link": "https://www.viagogo.com/_C-11165?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2016%7Cev-158961997%7Ccy-79823&ps_ev=158961997",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://viagogo.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Vividseats.com",
        "link": "https://www.vividseats.com/a-merryachi-christmas-tickets-san-francisco-davies-symphony-hall-11-30-2025--theater-musical/production/5868084",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://vividseats.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "San-francisco-theater.com",
        "link": "https://www.san-francisco-theater.com/shows/davies-symphony-hall/merry-achi-christmas/tickets/calendar"
      }
    ],
    "venue": {
      "google_id": "0x808580991be02fd9:0xc60bb460e5f31987",
      "name": "Louise M. Davies Symphony Hall",
      "phone_number": "+14158646000",
      "website": "https://www.sfsymphony.org",
      "review_count": 597,
      "rating": 4.8,
      "subtype": "Concert hall",
      "subtypes": [
        "Concert hall"
      ],
      "full_address": "Louise M. Davies Symphony Hall, 201 Van Ness Ave, San Francisco, CA 94102",
      "latitude": 37.7779294,
      "longitude": -122.42080879999999,
      "district": "Civic Center",
      "street_number": "201",
      "street": "201 Van Ness Ave",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11hcdwbfxd"
    }
  },
  {
    "event_id": "L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDI1LTEyLTEzfDI1ODE4Njg4OTg3ODYwMjg0NTY=",
    "name": "San Francisco Symphony - Disney's Frozen In Concert",
    "link": "https://open.spotify.com/concert/10TqkMV5a2H3SEnWi22oWu",
    "description": "Find tickets for Disney at Davies Symphony Hall in San Francisco on 12/13/2025 at 2:00 PM",
    "language": "en",
    "date_human_readable": "Sat, Dec 13, 2:00 – 3:30 PM PST",
    "start_time": "2025-12-13 14:00:00",
    "start_time_utc": "2025-12-13 22:00:00",
    "start_time_precision_sec": 1,
    "end_time": "2025-12-13 15:30:00",
    "end_time_utc": "2025-12-13 23:30:00",
    "end_time_precision_sec": 1,
    "is_virtual": false,
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5VicKxFJx1ZTAOLBng65NiKDqY62fPqNr3pxqzoCTtdoOSsU9DQXyKi4Pd36J&s",
    "publisher": "Spotify.com",
    "publisher_favicon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://open.spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    "publisher_domain": "open.spotify.com",
    "ticket_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/10TqkMV5a2H3SEnWi22oWu",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://spotify.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Sfsymphony.org",
        "link": "https://www.sfsymphony.org/Buy-Tickets/2025-26/Holiday-Frozen",
        "fav_icon": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://sfsymphony.org&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Festivaly.eu",
        "link": "https://festivaly.eu/en/san-fransisco-symphony-disneys-frozen-with-live-orchestra-davies-symphony-hall-san-francisco-2025",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://festivaly.eu&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Seatgeek.com",
        "link": "https://seatgeek.com/san-francisco-symphony-tickets/orchestral/2025-12-13-2-pm/17650249?gclsrc=%7BGOOGLE-ADS-CLICK-SOURCE%7D&refob=mta&ref_price=158.37",
        "fav_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://seatgeek.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      },
      {
        "source": "Stubhub.com",
        "link": "https://www.stubhub.com/_C-11165?pcid=PSUSAEVECONALLEF426C5CF9E&ps_p=8&ps_placement=eventfeed&ps=vn-2016%7Cev-158958446%7Ccy-79823&ps_ev=158958446",
        "fav_icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://stubhub.com&client=HORIZON&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2"
      }
    ],
    "info_links": [
      {
        "source": "Spotify.com",
        "link": "https://open.spotify.com/concert/10TqkMV5a2H3SEnWi22oWu"
      }
    ],
    "venue": {
      "google_id": "0x808580991be02fd9:0xc60bb460e5f31987",
      "name": "Louise M. Davies Symphony Hall",
      "phone_number": "+14158646000",
      "website": "https://www.sfsymphony.org",
      "review_count": 597,
      "rating": 4.8,
      "subtype": "Concert hall",
      "subtypes": [
        "Concert hall"
      ],
      "full_address": "Louise M. Davies Symphony Hall, 201 Van Ness Ave, San Francisco, CA 94102",
      "latitude": 37.7779294,
      "longitude": -122.42080879999999,
      "district": "Civic Center",
      "street_number": "201",
      "street": "201 Van Ness Ave",
      "city": "San Francisco",
      "zipcode": "94102",
      "state": "California",
      "country": "US",
      "timezone": "America/Los_Angeles",
      "google_mid": "/g/11hcdwbfxd"
    }
  }
];

// Transform OpenWebNinja events to Event format
export const openWebNinjaMockEvents: Event[] = openWebNinjaMockResponse.map(event => 
  transformOpenWebNinjaEventToEvent(event)
);

