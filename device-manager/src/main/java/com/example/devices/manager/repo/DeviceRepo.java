package com.example.devices.manager.repo;

import com.example.devices.manager.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeviceRepo extends JpaRepository<Device, Long> {
    // Custom native query to find devices by a list of person IDs
    @Query(value = "SELECT * FROM device d WHERE :personId = ANY(d.persons_id)", nativeQuery = true)
    List<Device> findByPersonIds(@Param("personId") Long personId);
}