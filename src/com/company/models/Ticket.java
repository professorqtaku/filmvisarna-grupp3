package com.company.models;

import express.database.Model;
import org.dizitart.no2.objects.Id;

import java.util.Arrays;

@Model
public class Ticket {
    @Id
    private String id;
    private int price;
    private long timeStamp;
    private int[] seats;
    private String userId;
    private String showId;
    private String movieId;
    private String salonName;

    @Override
    public String toString() {
        return "Ticket{" +
                "id='" + id + '\'' +
                ", price=" + price +
                ", timeStamp=" + timeStamp +
                ", seats=" + Arrays.toString(seats) +
                ", userId='" + userId + '\'' +
                ", showId='" + showId + '\'' +
                ", movieId='" + movieId + '\'' +
                ", salonName='" + salonName + '\'' +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public int[] getSeats() {
        return seats;
    }

    public void setSeats(int[] seats) {
        this.seats = seats;
    }

    public String getSalonName() {
        return salonName;
    }

    public void setSalonName(String salonName) {
        this.salonName = salonName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getShowId() {
        return showId;
    }

    public void setShowId(String showId) {
        this.showId = showId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }
}
